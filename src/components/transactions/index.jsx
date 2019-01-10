import PropTypes from 'prop-types';
import React from 'react';

import { withApollo } from 'react-apollo';
import { Subscribe } from 'unstated';

import TransactionsStore from './store';
import TransactionsTable from './table';

/**
 * Transactions Component
 */
function Transactions({ client }) {
    return (
        <Subscribe to={[TransactionsStore]}>
            {store => {
                const {
                    state: { data, loading }
                } = store;

                return (
                    <TransactionsTable
                        apolloClient={client}
                        data={data}
                        loading={loading}
                        store={store}
                    />
                );
            }}
        </Subscribe>
    );
}

Transactions.displayName = 'Transactions';

Transactions.propTypes = {
    client: PropTypes.shape({})
};

export default withApollo(Transactions);
