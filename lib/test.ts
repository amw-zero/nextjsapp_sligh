interface IncrementType {
 value: number
db: DBState
}

test("Test local action refinement: Increment", async () => {
  let state = {value: fc.integer(),
db: fc.custom()}
await fc.assert(fc.asyncProperty(async (state: IncrementType) => {
  4
}))
})
