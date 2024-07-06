module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: './test.sqlite3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
    prod: {
        client: 'sqlite3',
        connection: {
            filename: './prod.sqlite3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};
