import gql from 'graphql-tag';

import { Container } from 'unstated';

/**
 * TransactionsStore Container
 * @extends Container
 */
export default class TransactionsStore extends Container {
    /**
     * Creates an instance of TransactionsStore
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        /**
         * Component state
         * @type {Object}
         */
        this.state = {
            data: {},
            error: null,
            loading: true
        };

        this.buildQuery = this.buildQuery.bind(this);
    }

    /**
     * Build GraphQL transactions query
     * @param  {Number} [pageNumber=1] Page number to query
     * @return {Object}                GraphQL query
     */
    buildQuery(pageNumber = 1) {
        /**
         * GraphQL transactions query
         * @type {Object}
         */
        this.query = `
            {
                transactions(page: ${pageNumber}, limit: 25) {
                    docs {
                        id
                        date
                        description
                        account
                        amount
                        category
                        sub_category
                    }
                    pages
                    total
                }
            }
        `;

        return this.query;
    }

    /**
     * Get transactions from database
     * @param  {Object} apolloClient ApolloClient
     * @param  {Number} pageNumber   Page number to query
     * @return {State}               New transactions state
     */
    getTransactions(apolloClient, pageNumber) {
        const query = gql(this.buildQuery(pageNumber));

        this.setState({
            loading: true
        });

        return apolloClient.query({ query }).then(result => {
            this.setState({
                data: result.data,
                error: null,
                loading: false
            });
        });
    }
}
