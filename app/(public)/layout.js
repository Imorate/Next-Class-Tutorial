import Link from "next/link";

export default function PublicLayout({children}) {
    return (
        <>
            <nav>
                <Link href="/products">Products</Link>
            </nav>
            {children}
        </>
    )
}
