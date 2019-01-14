import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Table, Tag } from 'antd';
import { filter, groupBy, matches } from 'lodash';

import { spacingUnit } from '../../../styles/variables';

/**
 * Component used to render transactions table
 * @extends Component
 */
export default class TransactionsTable extends Component {
    /**
     * Creates an instance of TransactionsTable
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        const StyledAmount = styled.span`
            background-color: ${styledProps => styledProps.amount.startsWith('-') ? '#fce3e8' : '#e1faee'};
            color: ${styledProps => styledProps.amount.startsWith('-') ? '#ef0731' : '#13c26f'};
            padding: ${rem('4px')} ${spacingUnit(1)};
            border-radius: ${rem('4px')};
        `;

        const StyledDate = styled.span`
            font-weight: bold;
            text-transform: capitalize;
        `;

        /**
         * Transactions table date column config
         * @type {Array}
         */
        this.dateColumn = [
            {
                dataIndex: 'date',
                key: 'date',
                render: date => (
                    <StyledDate>
                        {moment(date).format('dddd Do MMMM YYYY')}
                    </StyledDate>
                )
            },
            {
                title: 'Description'
            },
            {
                title: 'Compte'
            },
            {
                title: 'Montant'
            },
            {
                title: 'Catégorie'
            },
            {
                title: 'Sous Catégorie'
            }
        ];

        /**
         * Transactions table columns config
         * @type {Array}
         */
        this.columns = [
            {
                dataIndex: 'description',
                key: 'description'
            },
            {
                dataIndex: 'account',
                key: 'account',
                render: account => {
                    if (
                        account === 'Compte Courant Postal Mr Turelier Pierrick'
                    ) {
                        return 'Compte Courant';
                    }

                    if (account === 'Livret A Mr Turelier Pierrick') {
                        return 'Livret A';
                    }

                    return account;
                }
            },
            {
                dataIndex: 'amount',
                key: 'amount',
                render: amount => (
                    <StyledAmount amount={amount.toString()}>
                        {amount
                            .toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })
                            .replace(/,00/, '')
                            .replace(/-/, '- ')}
                    </StyledAmount>
                )
            },
            {
                dataIndex: 'category',
                key: 'category',
                render: category => (
                    <Tag color="blue" key={category}>
                        {category}
                    </Tag>
                )
            },
            {
                dataIndex: 'sub_category',
                key: 'sub_category',
                render: subCategory => (
                    <Tag color="blue" key={subCategory}>
                        {subCategory}
                    </Tag>
                )
            }
        ];

        /**
         * Component state
         * @type {Object}
         */
        this.state = {
            currentPage: 1
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    /**
     * React lifecycle
     * @return {State}     Return new state with retrieved transactions from page 1
     */
    componentDidMount() {
        const { apolloClient, store } = this.props;

        return store.getTransactions(apolloClient);
    }

    /**
     * Retrieve transactions on page change
     * @param  {Number} page Page number to retrieve
     * @return {State}       Return new state with retrieved transactions
     */
    onPageChange(page) {
        const { apolloClient, store } = this.props;

        this.setState({ currentPage: page });
        store.getTransactions(apolloClient, page);
    }

    /**
     * React lifecycle
     */
    render() {
        const { data, loading } = this.props;
        const { currentPage } = this.state;
        const transactionsDate = [];

        const MainTable = styled(Table)`
            .ant-table-thead {
                > tr {
                    display: grid;
                    grid-template-columns: repeat(2, 0) 3fr repeat(4, 1fr);
                }
            }

            .ant-table-row {
                .ant-table-row-expand-icon-cell {
                    display: none;
                }
            }

            tr.ant-table-expanded-row {
                > td {
                    padding: 0 !important;

                    &:first-child {
                        display: none;
                    }

                    .ant-table-wrapper {
                        margin: 0;
                    }
                }
            }

            tr.ant-table-row,
            tr.ant-table-expanded-row {
                &:hover {
                    > td {
                        background-color: inherit;
                    }
                }
            }

            .ant-pagination-item-link {
                align-items: center;
                display: flex;
                height: 100%;
            }
        `;

        let expandedRowRender;
        let transactions = [];
        let pagination = {
            // eslint-disable-next-line
            onChange: this.onPageChange,
            pageSize: 25,
            showTotal: (total, range) =>
                `${range[0]}-${range[1]} de ${total} transactions`
        };

        if (!loading) {
            const totalTransactions =
                data && data.transactions && data.transactions.total;

            transactions = data && data.transactions && data.transactions.docs;

            const transactionsGroupedByDate = groupBy(
                transactions,
                transaction => transaction.date
            );

            Object.keys(transactionsGroupedByDate).map(key =>
                transactionsDate.push({
                    date: key
                })
            );

            pagination = {
                ...pagination,
                current: currentPage,
                total: totalTransactions
            };

            expandedRowRender = record => {
                const dataSource = filter(transactions, matches(record));

                const ExpandedTable = styled(Table)`
                    thead {
                        display: none;
                    }

                    tbody {
                        > tr {
                            display: grid;
                            grid-template-columns: 3fr repeat(4, 1fr);

                            td {
                                padding: 16px 8px;
                            }
                        }
                    }
                `;

                return (
                    <ExpandedTable
                        columns={this.columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                );
            };
        }

        return (
            <MainTable
                columns={this.dateColumn}
                dataSource={transactionsDate}
                defaultExpandAllRows
                expandedRowRender={expandedRowRender}
                loading={loading}
                pagination={pagination}
                rowKey={transactions => transactions.id} //eslint-disable-line
                scroll={{ y: 'calc(100vh - 208px)' }}
                size="small"
            />
        );
    }
}

TransactionsTable.displayName = 'TransactionsTable';

TransactionsTable.propTypes = {
    apolloClient: PropTypes.shape({}),
    data: PropTypes.shape({}),
    loading: PropTypes.bool,
    store: PropTypes.shape({})
};
