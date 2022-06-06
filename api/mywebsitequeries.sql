SELECT B.id AS bookId, B.title AS bookTitle, B.status, B.link, Cli."name" AS author, Pay."totalAmountPaid", Pay."modifiedDate" FROM public."book" AS B 
INNER JOIN public."client" AS Cli ON Cli.id = B."clientId" 
LEFT JOIN public."bookPaymentBalance" AS Pay ON  Pay."bookId" = B.id
