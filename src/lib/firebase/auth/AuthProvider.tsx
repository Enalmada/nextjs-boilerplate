"use client";

import type * as React from "react";
import { AuthContext, type User } from "./AuthContext";

export interface AuthProviderProps {
	user: User | null;
	children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
	user,
	children,
}) => {
	return (
		<AuthContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
