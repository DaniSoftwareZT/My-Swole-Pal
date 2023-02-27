import { useEffect, useState } from "react";
import { useGetTokenQuery } from './store/api';
import Notification from "./Notification";
import Nav from "./Nav";
import "./App.css";
import {Routes, Route} from "react-router-dom"
import MainPage from "./MainPage"
import SignupForm from "./SignupForm"


function App() {
	return (
			<>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="signup">
						<Route path="new" element={<SignupForm />} />
					</Route>
					{/* <Route path="login">
						<Route path="new" element={<LoginForm />} />
					</Route> */}
				</Routes>
			</div>
			</>
	);
}



// function App() {
//   const { data: tokenData } = useGetTokenQuery();
  // const isPatron = tokenData && tokenData.account && tokenData.account.roles.includes('patron');
  // const accountId = tokenData && tokenData.account && tokenData.account.id;

//   return (
//     <div className="container my-4">
//       {isLoading
//         ? <Notification>Loading data</Notification>
//         : isError
//           ? <Notification type="danger">
//             Could not load book list.
//             Please try again later.
//           </Notification>
//           : <div className="book-grid">
//             {data.books.map(book => (
//               <BookCard
//                 key={book.id}
//                 book={book}
//                 isPatron={isPatron}
//                 accountId={accountId} />
//             ))}
//           </div>
//       }
//     </div>
//   );
// }

export default App;
