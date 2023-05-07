import { useState } from 'react';

function SearchInput() {
	const [searchText, setSearchText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		alert('This will work soon, look at core functionality :)\nNFT Explorer will be in the app soon :)')
	};

	return (
		<form onSubmit={handleSubmit} className="m-auto w-full text-center p-4">
			<input
				type="text"
				placeholder="Search by Address / Txn Hash / Block"
				className="py-2 pr-8 pl-3 w-[calc(100%-50px)] text-white bg-slate-800 rounded-md border-2 border-transparent hover:border-slate-400 focus:outline-none focus:border-slate-400 cursor-pointer"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<button type="submit" className="p-2 ml-2 text-white bg-slate-800 rounded-md border-2 border-transparent hover:border-slate-400 focus:border-slate-400">
				🔍
			</button>
		</form>
	);
}

export { SearchInput };