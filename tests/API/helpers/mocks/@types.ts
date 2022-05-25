export interface Mock {
    /** Add record to the database. */
    prepare: (...args: any[]) => Promise<any>;
    /** Remove created record from the db */
    remove: () => Promise<void>;
}
