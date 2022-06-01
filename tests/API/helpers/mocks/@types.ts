export interface Mock {
    /** Add record to the database. */
    prepare: (...args: any[]) => Promise<Mock>;
    /** Remove created record from the db */
    remove: () => Promise<Mock>;
}

export interface ReviewMock extends Mock {
    /**
     * Add to the database records representing likes and dislikes from **unexisting** users
     */
    addFeedback: (params: {
        /** Number of likes to add */
        likes: number;
        /** Number of dislikes to add */
        dislikes: number;
    }) => Promise<Mock>;
}
