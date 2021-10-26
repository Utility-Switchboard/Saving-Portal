// ADDRESS RESPONSE
cy.request('https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/uk/NR14%207PZ')
.then((response) => {
    expect(response.status).equal(200)
    expect(response.body).to.not.be.null
});
