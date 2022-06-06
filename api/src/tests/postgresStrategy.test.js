const assert = require('assert')
const PostGresDB = require('./../database/strategies/postgres')
const ContextStrategy = require('./../database/strategies/base/contextStrategy')

const context = new ContextStrategy(new PostGresDB())

const entityNames = {
  user :'user',
  client : 'client',
  artwork : 'artwork',
  book : 'book',
  bookDeliverable : 'bookDeliverable',
  bookPaymentBalance: 'bookPaymentBalance'
}


// describe('Testing Database',  () => {
//  before(async()=> {
//     await context.connect()
//   })  

//   it('connection', async () => {
//       const result = await context.isConnected()
//       assert.deepEqual(result, true)
//     })
// })

describe('Testing Entities = > USER',  () => {
  const MOCK_USER = {
    id:1,
    login:'admin',
    password:'040580'
  }
  
  const MOCK_USERTO_CREATE = {
    login:'admin5',
    password:'040580'
  }
  
  const MOCK_USER_TO_UPDATE = {
    id:42,
    login:'admin5',
    password:'654321'
  }
  
  const MOCK_USER_TO_DELETE = {
    id:42,
    login:'admin5',
    password:'654321'
  }

   before(async()=> {
    await context.connect()
  })  


    // it('register user', async () => {
    //   const result = await context.create(entityNames.user ,MOCK_USERTO_CREATE)
    //   delete result.id
    //   assert.deepStrictEqual(result, MOCK_USERTO_CREATE)
    // })

    // it('read user', async () => {
    //   const [result] = await context.read(entityNames.user, {login: MOCK_USER.login, id:1})
    //   assert.deepEqual(result, MOCK_USER)
    // })

    // it('update user', async () => {
    //  const [itemToUpdate] = await context.read(entityNames.user, {id: MOCK_USER_TO_UPDATE.id})
    //  const novoItem = {
    //    ...MOCK_USER_TO_UPDATE,
    //    login :'admin4'
    //  }

    //  const [result] = await context.update(entityNames.user, {id: itemToUpdate.id}, novoItem)
    //  assert.deepEqual(result, 1)
    //  })

    //  it('delete user', async () => {
    //   const [itemDelete] = await context.read(entityNames.user, {id: MOCK_USER_TO_DELETE.id})
    //   const result = await context.delete(entityNames.user, itemDelete.id)
    //   assert.deepEqual(result, 1)
    //   })
})

describe('Testing Entities = > CLIENT',  () => {

  const MOCK_CLIENT = {
    id:1,
    name:'Kristy Houle',
    email:'lalaal@lalal.com',
    active: false
  }
  
  const MOCK_CLIENT_TO_CREATE = {
    name:'Kristy Houle',
    email:'lalaal@lalal.com',
    active: false
  }
  
  const MOCK_CLIENT_TO_UPDATE = {
    id:52,
    name:'Kristy Houle',
    email:'lalaal@lalal.com',
    active: false
  }
  
  const MOCK_CLIENT_TO_DELETE = {
    id:53,
    name:'Kristy Houle',
    email:'lalaal@lalal.com',
    active: false
  }

  before(async()=> {
   await context.connect()
 })  

  //  it('register client', async () => {
  //    const result = await context.create(entityNames.client ,MOCK_CLIENT_TO_CREATE)
  //   delete result.id
  //   assert.deepStrictEqual(result, MOCK_CLIENT_TO_CREATE)
  //  })

  //  it('read client', async () => {
  //    const [result] = await context.read(entityNames.client, {name: MOCK_CLIENT.name})
  //    delete MOCK_CLIENT.id
  //    delete result.id
  //    assert.deepEqual(result, MOCK_CLIENT)
  //  })

  //  it('update client', async () => {
  //   const [itemToUpdate] = await context.read(entityNames.client, {name: MOCK_CLIENT_TO_UPDATE.name})

  //   const novoItem = {
  //     ...MOCK_CLIENT_TO_UPDATE,
  //     name :'Kristy',
  //     active: false
  //   }

  //   const [result] = await context.update(entityNames.client,  { id: 52 }, novoItem)
  //   assert.deepEqual(result, 1)
  //   })

  //   it('delete user', async () => {
  //    const [itemDelete] = await context.read(entityNames.client, {id: MOCK_CLIENT_TO_DELETE.id})
  //    const result = await context.delete(entityNames.client, itemDelete.id)
  //    assert.deepEqual(result, 1)
  //    })

})

describe('Testing Entities = > BOOK',  () => {

  before(async()=> {
   await context.connect()
 })  

  //  it('register book', async () => {

  //   const MOCK_BOOK_TO_CREATE = {
  //   //  id:1,
  //     clientId: 1,
  //     title:'Quigley\'s Questions',
  //     status:'Published', // On Going / Cancelled
  //     link: 'http://www.amazon.ca',
  //      thumbnail: 'img/quigleyquestion.jpg'
  //   }
  
  //    const result = await context.create(entityNames.book ,MOCK_BOOK_TO_CREATE)
  //    delete result.id
  //   assert.deepStrictEqual(result, MOCK_BOOK_TO_CREATE)
  //  })

  //  it('read book', async () => {
  //   const MOCK_BOOK = {
  //     id:1,
  //     clientId: 1,
  //     title:'Quigley\'s Questions',
  //     status:'Published', // On Going / Cancelled
  //     link: 'http://www.amazon.ca',
  //     thumbnail: 'img/b-quigleyquestion.jpg'
  //   }
    
  //    const [result] = await context.read(entityNames.book, {clientId: MOCK_BOOK.clientId})
  //    delete MOCK_BOOK.id
  //    delete result.id
  //    assert.deepEqual(result, MOCK_BOOK)
  //  })

  //  it('update book', async () => {

  //   const MOCK_BOOK_TO_UPDATE = {
  //     clientId: 1,
  //     title:'Quigley\'s Questions',
  //     status:'Published', // On Going / Cancelled
  //     link: 'http://www.amazon.ca'
  //   }
    
  //   const [itemToUpdate] = await context.read(entityNames.book, {title: MOCK_BOOK_TO_UPDATE.title, clientId: 1})

  //   const novoItem = {
  //     ...MOCK_BOOK_TO_UPDATE,
  //     title :'Questions',
  //     status:'On Going'
  //   }

  //   const [result] = await context.update(entityNames.book,  { clientId: 1 }, novoItem)
  //   assert.deepEqual(result, 1)
  //   })

    // it('delete book', async () => {

    //   const MOCK_BOOK_TO_DELETE = {
    //     clientId: 1,
    //     title:'Quigley\'s Questions',
    //     status:'Published', // On Going / Cancelled
    //     link: 'http://www.amazon.ca'
    //   }

    //  const [itemDelete] = await context.read(entityNames.book, {clientId: MOCK_BOOK_TO_DELETE.clientId})
    //  const result = await context.delete(entityNames.book, {clientId: itemDelete.clientId})
    //  assert.deepEqual(result, 1)
    //  })

})

describe('Testing Entities = > BOOK DELIVERABLE',  () => {

  before(async()=> {
   await context.connect()
 })  

  //  it('register book deliverable', async () => {

  //   const MOCK_BOOK_DELIVERABLE_TO_CREATE = {
  //   //  id:1,
  //     bookId: 1,
  //     description:'page 1-2 spread',
  //     status:'Delivered', // Sketch / Revision
  //     link: 'http://www.amazon.ca',
  //     amount: 60,
  //     modifiedDate: new Date()
  //   }
  
  //    const result = await context.create(entityNames.bookDeliverable , MOCK_BOOK_DELIVERABLE_TO_CREATE)
  //    delete result.id
  //    assert.deepStrictEqual(result.description,  MOCK_BOOK_DELIVERABLE_TO_CREATE.description)
  //  })

  //  it('read book', async () => {
  //   const MOCK_BOOK_DELIVERABLE = {
  //     id:1,
  //     bookId: 1,
  //     description:'page 1-2 spread',
  //     status:'Delivered', // Sketch / Revision
  //     link: 'http://www.amazon.ca',
  //     amount: 60,
  //     modifiedDate: new Date()
  //   }
    
  //    const [result] = await context.read(entityNames.bookDeliverable, {bookId: MOCK_BOOK_DELIVERABLE.bookId, description: MOCK_BOOK_DELIVERABLE.description})
  //    delete MOCK_BOOK_DELIVERABLE.id
  //    delete result.id
  //    assert.deepEqual(result.bookId, MOCK_BOOK_DELIVERABLE.bookId)
  //  })

  //  it('update book', async () => {

  //   const MOCK_BOOK_DELIVERABLE_TO_UPDATE = {
  //     id:1,
  //     bookId: 1,
  //     description:'page 1-2 spread',
  //     status:'Delivered', // Sketch / Revision
  //     link: 'http://www.amazon.ca',
  //     amount: 60,
  //     modifiedDate: new Date()
  //   }
    
  //   const [itemToUpdate] = await context.read(entityNames.bookDeliverable, {description: MOCK_BOOK_DELIVERABLE_TO_UPDATE.description, bookId: 1})

  //   const novoItem = {
  //     ...MOCK_BOOK_DELIVERABLE_TO_UPDATE,
  //     status:'Revision'
  //   }

  //   const [result] = await context.update(entityNames.bookDeliverable,  { bookId: 1 }, novoItem)
  //   assert.deepEqual(result, 1)
  //   })

    // it('delete book deliverable', async () => {

    //   const MOCK_BOOK_DELIVERABLE_TO_DELETE = {
    //     id:1,
    //     bookId: 1,
    //     description:'page 1-2 spread',
    //     status:'Delivered', // Sketch / Revision
    //     link: 'http://www.amazon.ca',
    //     amount: 60,
    //     modifiedDate: new Date()
    //   }

    //  const [itemDelete] = await context.read(entityNames.bookDeliverable, {bookId: MOCK_BOOK_DELIVERABLE_TO_DELETE.bookId})
    //  const result = await context.delete(entityNames.bookDeliverable, {bookId: itemDelete.bookId})
    //  assert.deepEqual(result, 1)
    //  })

})

describe('Testing Entities = > BOOK PAYMENT BALANCE',  () => {

  before(async()=> {
   await context.connect()
 })  

  // it('register book payment balance', async () => {

  //   const MOCK_BOOK_PAYMENT_BALANCE_TO_CREATE = {
  //   //  id:1,
  //     bookId: 1,
  //     totalAmountPaid: 60,
  //     modifiedDate: new Date()
  //   }
  
  //    const result = await context.create(entityNames.bookPaymentBalance , MOCK_BOOK_PAYMENT_BALANCE_TO_CREATE)
  //    delete result.id
  //    assert.deepStrictEqual(result.description,  MOCK_BOOK_PAYMENT_BALANCE_TO_CREATE.description)
  // })

  //  it('read book  payment balance', async () => {
  //   const MOCK_BOOK_PAYMENT_BALANCE = {
  //  //  id:1,
  //     bookId: 1,
  //     totalAmountPaid: 60,
  //     modifiedDate: new Date()
  //   }
    
  //    const [result] = await context.read(entityNames.bookPaymentBalance, {bookId: MOCK_BOOK_PAYMENT_BALANCE.bookId})
  //    delete MOCK_BOOK_PAYMENT_BALANCE.id
  //    delete result.id
  //    assert.deepEqual(result.bookId, MOCK_BOOK_PAYMENT_BALANCE.bookId)
  //  })

  //  it('update book  payment balance', async () => {

  //   const MOCK_BOOK_PAYMENT_BALANCE_TO_UPDATE = {
  //  //  id:1,
  //     bookId: 1,
  //     totalAmountPaid: 60,
  //     modifiedDate: new Date()
  //   }
    
  //   const [itemToUpdate] = await context.read(entityNames.bookPaymentBalance, { bookId: 1})

  //   const novoItem = {
  //     ...MOCK_BOOK_PAYMENT_BALANCE_TO_UPDATE,
  //     totalAmountPaid: 120
  //   }

  //   const [result] = await context.update(entityNames.bookPaymentBalance,  { bookId: 1 }, novoItem)
  //   assert.deepEqual(result, 1)
  //   })

  //   it('delete book  payment balance', async () => {

  //     const MOCK_BOOK_PAYMENT_BALANCE_TO_DELETE = {
  //  //  id:1,
  //     bookId: 1,
  //     totalAmountPaid: 60,
  //     modifiedDate: new Date()
  //     }

  //    const [itemDelete] = await context.read(entityNames.bookPaymentBalance, {bookId: MOCK_BOOK_PAYMENT_BALANCE_TO_DELETE.bookId})
  //    const result = await context.delete(entityNames.bookPaymentBalance, {bookId: itemDelete.bookId})
  //    assert.deepEqual(result, 1)
  //    })

})

describe('Testing Entities = > ARTWORK',  () => {

  before(async()=> {
   await context.connect()
 })  

  // it('register artwork', async () => {

  //   const MOCK_ARTWORK_TO_CREATE = {
  //   //  id:1,
  //     clientId: 0,
  //     title:'some art',
  //     link:'http://www.google.com',
  //     thumbnail:'img/d-image-small',
  //     image:'img/d-image-big',
  //     description:'description text',
  //     tools:'Photoshop, Illustrator',
  //     category:'children', // realism, cartoon, vectorial, fabric, sculpture, painting, drawing
  //     createdDate: new Date()
  //   }
  
  //    const result = await context.create(entityNames.artwork , MOCK_ARTWORK_TO_CREATE)
  //    delete result.id
  //    assert.deepStrictEqual(result.title,  MOCK_ARTWORK_TO_CREATE.title)
  // })

  //  it('read artwork', async () => {
  //   const MOCK_ARTWORK = {
  //     //  id:1,
  //     clientId: 0,
  //         title:'some art',
  //         link:'http://www.google.com',
  //         thumbnail:'img/d-image-small',
  //         image:'img/d-image-big',
  //         description:'description text',
  //         tools:'Photoshop, Illustrator',
  //         category:'children', // realism, cartoon, vectorial, fabric, sculpture, painting, drawing
  //         createdDate: new Date()
  //   }
    
  //    const [result] = await context.read(entityNames.artwork, {title: MOCK_ARTWORK.title, category: MOCK_ARTWORK.category})
  //    delete MOCK_ARTWORK.id
  //    delete result.id
  //    assert.deepEqual(result.title, MOCK_ARTWORK.title)
  //  })

  //  it('update artwork', async () => {

  //   const MOCK_ARTWORK_TO_UPDATE = {
  //  //  id:1,
  //     clientId: 0,
  //         title:'some art',
  //         link:'http://www.google.com',
  //         thumbnail:'img/d-image-small',
  //         image:'img/d-image-big',
  //         description:'description text',
  //         tools:'Photoshop, Illustrator',
  //         category:'children', // realism, cartoon, vectorial, fabric, sculpture, painting, drawing
  //         createdDate: new Date()
  //   }
    
  //   const [itemToUpdate] = await context.read(entityNames.artwork, { title: MOCK_ARTWORK_TO_UPDATE.title})

  //   const novoItem = {
  //     ...MOCK_ARTWORK_TO_UPDATE,
  //     description: 'whatever'
  //   }

  //   const [result] = await context.update(entityNames.artwork,  { title: MOCK_ARTWORK_TO_UPDATE.title }, novoItem)
  //   assert.deepEqual(result, 1)
  //   })

    // it('delete artwork', async () => {

    //   const MOCK_ARTWORK_TO_DELETE = {
    //       id:1,
    //        clientId: 0,
    //       title:'some art',
    //       link:'http://www.google.com',
    //       thumbnail:'img/d-image-small',
    //       image:'img/d-image-big',
    //       description:'description text',
    //       tools:'Photoshop, Illustrator',
    //       category:'children', // realism, cartoon, vectorial, fabric, sculpture, painting, drawing
    //       createdDate: new Date()
    //   }

    //  const [itemDelete] = await context.read(entityNames.artwork, {title: MOCK_ARTWORK_TO_DELETE.title})
    //  const result = await context.delete(entityNames.artwork, {id: itemDelete.id})
    //  assert.deepEqual(result, 1)
    //  })

})