export class z2mcSemanticsAdaptor {
    constructor(semantics) {
        this.semantics = semantics;
    }
    initial() {
        return this.semantics.initial();
    }
    actions(c) {
        return this.semantics.actions(c);
    }
    execute(a, c) {
        return this.semantics.execute(a, c);
    }
    isAccepting(c) {
        return true;
    }
    configurationHashFn(c) {
        return c.hashCode();
    }
    configurationEqFn(c1, c2) {
        return c1.equals(c2);
    }
}

export class z2mcDependentSemanticsAdaptor {
    constructor(semantics, isAccepting) {
        this.semantics = semantics;
        this.isAccepting = isAccepting;
    }
    initial() {
        return this.semantics.initial();
    }
    actions(i, c) {
        return this.semantics.actions(i, c);
    }
    execute(a, i, c) {
        return this.semantics.execute(a, i, c);
    }
    isAccepting(c) {
        return this.isAccepting(c);
    }
    configurationHashFn(c) {
        return c.hashCode();
    }
    configurationEqFn(c1, c2) {
        return c1.equals(c2);
    }
}