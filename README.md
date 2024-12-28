# Tour Agency in next.js
using typescript & material components for react


### Furthermore, how to run this tour agency application:
=======
# 1. we are using Next.js and prisma, but there are some issues in the Prisma when you run on the VS-code terminal.
# 2. Use the (Command prompt or Terminal) pannel of Windows or Macbook, Don't use VS-code terminal.
1. 
    ```npm
    npm run i
    ```
2. Configure **PostgreSQL** connection string in `.env`
3. Run **Prisma** commands to handle DB staff `prisma migrate dev` && `prisma generate`

    > If you face any troubles while running above prisma's commands, just install prisma globally via:

    ```npm
    npm i -g prisma
    ```

4. Run `npm run dev` and enjoy my majesty
5. Take into account the fact, that the `navigation bar` is currently disabled due to make it work much better in the future 👍👍. In order to visit my stunning `registration form` you have to manually visit `/register` route.
