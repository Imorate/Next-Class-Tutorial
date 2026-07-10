import Link from "next/link";

export default async function Page() {
    let todos = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json());
    return (
        <>
            <table style={{width: '100%', border: '1px solid black'}}>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(({completed, id, title, userId}) => {
                    return <tr key={id}>
                        <td>{userId}</td>
                        <td><Link href={`/products/${id}`}>{id}</Link></td>
                        <td>{title}</td>
                        <td>{completed.toString()}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
};
