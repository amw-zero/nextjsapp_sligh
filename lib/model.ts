export class Counter {
    value: number = 0;

    increment() {
        this.value += 1;
    }

    decrement() {
        this.value -= 1;
    }
}

interface User {
    id: number;
    name: string;
    password: string;
}

type RecurrenceRule = number;

interface RecurringTransaction {
    id: number;
    name: string;
    recurrenceRule: RecurrenceRule;
}

interface CreateRecurringTransaction {
    name: string;
    recurrenceRule: RecurrenceRule;
}

export class PersonalFinance {
    users: User[] = [];

    // IDs of users with active sessions
    sessions: number[] = [];
    recurringTransactions: RecurringTransaction[] = []

    error: string | null = null;
    
    ids: Record<string, number> = {};

    genId(model: string): number {
        const currId = this.ids[model];
        const nextId = currId + 1;
        this.ids[model] = nextId;

        return nextId;
    }

    signUp(name: string, password: string) {
        this.error = null;
        this.users.push({ name, password, id: this.genId("users") });
    }

    logIn(name: string, password: string) {
        const user = this.users.find((user) => user.name === name && user.password === password);
        if (user === undefined) {
            this.error = "user not found";
            return;
        }

        if (this.sessions.includes(user.id)) {
            this.error = "user already logged in";
            return;
        }

        this.error = null;
        this.sessions.push(user.id);
    }

    // Action signature: CreateRecurringTransaction => userId => User[] => RecurringTransaction[] => (RecurringTransaction)
    // Issue - User[] and Recurring[] are _all_ resources of that type in system. Not modular. Maybe just skip these properties.
    // Idea: multi-tenancy is an optimization. Model per-user data. Still have to consider all transactions for a particular user, 
    // which may not be small.
    createRecurringTransaction(crt: CreateRecurringTransaction, userId: number) {
        const user = this.findUser(userId);
        if (user === undefined) {
            this.error = "user not authenticated";
        }

        this.recurringTransactions.push({ ...crt, id: this.genId("recurringTransaction")});
    }

    findUser(userId: number): User | undefined {
        return this.users.find((user) => user.id === userId);
    }
}