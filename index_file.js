import { readSoup, evaluateStepString, SoupSemantics } from 'soup';
import { readExpression, RegeDependentSemantics, isAccepting, Brzozowski } from 'rege';

import { STR2TR, StepSynchronousProductSemantics, dfs_hashset_predicate_mc_full } from 'z2mc';
import { z2mcSemanticsAdaptor, z2mcDependentSemanticsAdaptor } from './z2mc-adaptors.js';

import util from 'util';
import { readFile } from 'fs/promises';

async function soupFromFile(filePath) {
    try {
      const data = await readFile(filePath, 'utf8');
      return readSoup(data);
    //   console.log(data);
    } catch (error) {
      console.error(`Error reading file from disk: ${error}`);
    }
  }

//read the model
const soup = await soupFromFile('../soup-js/examples/alice-bob2.soup');

//instantiate the model semantics
const soupSemantics = new SoupSemantics(soup);
//adapt to z2mc
const z2mcSemantics = new z2mcSemanticsAdaptor(soupSemantics);

//read the property
//exclusion
// const property = readExpression(`τ[!(a == 2 ∧ b == 2)]* ⋅ τ[a == 2 ∧ b == 2]`);
// const property = readExpression(`τ[true]* ⋅ τ[a == 2 ∧ b == 2]`);
//not deadlock
const property = readExpression(`τ [true]* ⋅ τ [deadlock]`);
//exclusion and not-deadlock
// const property = readExpression(`τ[true]* ⋅ (τ[a == 2 ∧ b == 2] | τ [deadlock])`);
//full exploration
// const property = readExpression(`τ [true]* ⋅ τ [false]`);

//instantiate the REGE semantics
const propertySemantics = new RegeDependentSemantics(property, Brzozowski, evaluateStepString);
//adapt to z2mc
const z2mcDependentSemantics = new z2mcDependentSemanticsAdaptor(propertySemantics, isAccepting);

//compose the model and the property
const composedSemantics = new StepSynchronousProductSemantics(z2mcSemantics, z2mcDependentSemantics);

//convert to TR
const tr = new STR2TR(composedSemantics);

const start = performance.now();

//model check
const result = await dfs_hashset_predicate_mc_full(
    tr,
    (c) => c,
    (c) => tr.isAccepting(c),
    (c) => tr.configurationHashFn(c), (a, b) => tr.configurationEqFn(a, b));

const end = performance.now();

console.log(util.inspect(result, { depth: null, colors: true }));

console.log(`Execution time: ${end - start} ms`);

