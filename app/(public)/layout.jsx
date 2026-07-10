import Link from "next/link";

export default function Layout({children}) {
    return (
        <>
            <nav>
                <Link href="/products">Products</Link>
            </nav>
            {children}
        </>
    )
}
