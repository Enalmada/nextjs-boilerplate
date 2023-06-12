/* eslint-disable */
"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";
import Link from 'next/link'
import {allFilmsWithVariablesQueryDocument} from "@/queries-mutations";

export default function ListUsers() {
    const [count, setCount] = React.useState(0);
    const { data, error } = useSuspenseQuery(allFilmsWithVariablesQueryDocument);

    return (
        <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h4 style={{ marginBottom: 16 }}>{count}</h4>
                <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
                <button
                    onClick={() => setCount((prev) => prev - 1)}
                    style={{ marginInline: 16 }}
                >
                    decrement
                </button>
                <button onClick={() => setCount(0)}>reset</button>
            </div>

            {error ? (
                <p>Oh no, there was an error</p>
            ) : !data ? (
                <p>Loading...</p>
            ) : data ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        gap: 20,
                    }}
                >
                    {data?.users?.map((user: any) => (
                        <div
                            key={user.id}
                            style={{ border: "1px solid #ccc", textAlign: "center" }}
                        >
                            <img
                                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                                alt={user.name}
                                style={{ height: 180, width: 180 }}
                            />
                            <h3>{user.name}</h3>
                        </div>
                    ))}
                </div>
            ) : null}
            <Link href="/">Home</Link>
        </main>
    );
}
