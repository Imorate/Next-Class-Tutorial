export default async function Products({params}) {
    const {slug} = await params;
    let todo = await fetch(`https://jsonplaceholder.typicode.com/todos/${slug[0]}`)
        .then(res => res.json());
    return (
        <>
            <p><b>UserID</b>: {todo.userId}</p>
            <p><b>ID</b>: {todo.id}</p>
            <p><b>Title</b>: {todo.title}</p>
            <p><b>Completed</b>: {todo.completed.toString()}</p>
        </>
    );
}
