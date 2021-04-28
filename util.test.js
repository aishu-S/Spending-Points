const testing = require('./utils')

  test('sorting the list', () => {
      unsortedList = [ { payer: 'MILLER COORS',
      points: 10000,
      timestamp: '2020-11-01T14:00:00Z' },
    { payer: 'UNILEVEL',
      points: 200,
      timestamp: '2020-10-31T11:00:00Z' },
    { payer: 'DANNON',
      points: -200,
      timestamp: '2020-10-31T15:00:00Z' },
    { payer: 'DANNON',
      points: 300,
      timestamp: '2020-10-31T10:00:00Z' } ]

      sortedList = [ { payer: 'DANNON',
      points: 300,
      timestamp: '2020-10-31T10:00:00Z' },
    { payer: 'UNILEVEL',
      points: 200,
      timestamp: '2020-10-31T11:00:00Z' },
    { payer: 'DANNON',
      points: -200,
      timestamp: '2020-10-31T15:00:00Z' },
    { payer: 'MILLER COORS',
      points: 10000,
      timestamp: '2020-11-01T14:00:00Z' } ]

    expect(testing.sortList(unsortedList)).toStrictEqual(sortedList);
  });

  test('Sorting with no data', () => {
    a = []
    b = []
    expect(testing.sortList(a)).toStrictEqual(b)
  });

  test('Correct input data', () => {
    inputData = { payer: 'DANNON',
    points: 300,
    timestamp: '2020-10-31T10:00:00Z' }
    expect(testing.checkInput(inputData)).toBe(true)
  });

  test('Incorrect input data', () => {
    inputData = { payer: 'DANNON',
    timestamp: '2020-10-31T10:00:00Z' }
    expect(testing.checkInput(inputData)).toBe(false)
  });

  test('No points of any payer goes negative', () => {
    let inputData = [ { payer: 'DANNON',
    points: 300,
    timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVEL',
    points: 200,
    timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON',
    points: -200,
    timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS',
    points: 10000,
    timestamp: '2020-11-01T14:00:00Z' } ]

    let dataMap = new Map()
    expect(testing.isValidData(inputData, dataMap)).toBe(true)
  });

  test('The points of a payer becomes less than 0', () => {
    let inputData = [ { payer: 'UNILEVEL',
    points: 200,
    timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON',
    points: -200,
    timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS',
    points: 10000,
    timestamp: '2020-11-01T14:00:00Z' } ]

    let dataMap = new Map()
    expect(testing.isValidData(inputData, dataMap)).toBe(false)
  });

  test('Code gives expected results', () => {
    points = 5000
    inputData = [ { payer: 'DANNON',
    points: 300,
    timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVEL',
    points: 200,
    timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON',
    points: -200,
    timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS',
    points: 10000,
    timestamp: '2020-11-01T14:00:00Z' } ]
    solution = [ { payer: 'UNILEVEL', points: 200 },
  { payer: 'DANNON', points: 100 },
  { payer: 'MILLER COORS', points: 4700 } ]
    expect(testing.calculateSpendingPoints(points, inputData)).toStrictEqual(solution)
  });

  test('The points to spend is more than the total points of all the payers', () => {
    points = 50000
    inputData = [ { payer: 'DANNON',
    points: 300,
    timestamp: '2020-10-31T10:00:00Z' },
  { payer: 'UNILEVEL',
    points: 200,
    timestamp: '2020-10-31T11:00:00Z' },
  { payer: 'DANNON',
    points: -200,
    timestamp: '2020-10-31T15:00:00Z' },
  { payer: 'MILLER COORS',
    points: 10000,
    timestamp: '2020-11-01T14:00:00Z' } ]

    expect(testing.calculateSpendingPoints(points, inputData)).toBe("ERROR: Not enough points! Please restart the server with new data.")
  });