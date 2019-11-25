/* eslint-disable @typescript-eslint/no-explicit-any */

import TableData from './tableData'


describe('TableData', () => {
    it('can add a new row', () => {
        const currentTable = new TableData({
            header: [
                '1',
                '2'
            ],
            body: [
                ['1', '2'],
                ['3', '4']
            ]
        })
        const newTable = currentTable.addRow()
        expect(newTable.body).toStrictEqual([
            ['1', '2'],
            ['3', '4'],
            ['Cell', 'Cell']
        ])
    })

    it('can remove a row', () => {
        const currentTable = new TableData({body: [['Cell'], ['Cell 2'], ['Cell 3']]})
        const newTable = currentTable.removeRow(1)
        expect(newTable.body).toStrictEqual([['Cell'], ['Cell 3']])
    })

    it('can add a column', () => {
        const currentTable = new TableData({
            header: [
                'My first column'
            ],
            body: [
                ['Cell'],
                ['Cell'],
                ['Cell']
            ]
        })

        const newTable = currentTable.addColumn()
        expect(newTable.header).toStrictEqual([
            'My first column',
            'Column name'
        ])
        expect(newTable.body).toStrictEqual([
            ['Cell', 'Cell'],
            ['Cell', 'Cell'],
            ['Cell', 'Cell']
        ])
    })

    it('can remove a column', () => {
        const currentTable = new TableData({
            header: [
                'My first column',
                'My second column',
                'My third column'
            ],
            body: [
                ['Cell', 'Cell2', 'Cell'],
                ['Cell', 'Cell2', 'Cell'],
                ['Cell', 'Cell2', 'Cell']
            ]
        })

        const newTable = currentTable.removeColumn(1)
        expect(newTable.header).toStrictEqual([
            'My first column',
            'My third column'
        ])
        expect(newTable.body).toStrictEqual([
            ['Cell', 'Cell'],
            ['Cell', 'Cell'],
            ['Cell', 'Cell']
        ])
    })

    it('can edit a cell in the body of the table', () => {
        const currentTable = new TableData({
            header: [
                '1',
                '2'
            ],
            body: [
                ['1', '2'],
                ['3', '4']
            ]
        })

        const newTable = currentTable.editBodyCell(1, 1, '4 and 5')
        expect(newTable.header).toStrictEqual(currentTable.header)
        expect(newTable.body).toStrictEqual([
            ['1', '2'],
            ['3', '4 and 5']
        ])
    })

    it('can edit a cell in the header of the table', () => {
        const currentTable = new TableData({
            header: [
                '1',
                '2'
            ],
            body: [
                ['1', '2'],
                ['3', '4']
            ]
        })

        const newTable = currentTable.editHeaderCell(1, '2 and 3')
        expect(newTable.header).toStrictEqual(['1', '2 and 3'])
        expect(newTable.body).toStrictEqual(currentTable.body)
    })
})