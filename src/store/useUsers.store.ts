import { create } from "zustand";

import { ApiParams, UsersData, UsersStatistics } from "core/types";
import { getAllUsers } from "core/services";
import { UserMapping } from "core/utils";

interface Props {
    fetching: boolean;
    hasError: boolean;
    usersList: UsersData[];
    fetchedUsersList: UsersData[];
    userStatistics: UsersStatistics[];
    availableCountries: string[];
    handleSearchUsers: (search: string) => void;
    handleFilteredCountries: (filter: string) => void;
    fetchUsersList: (params?: ApiParams) => Promise<void>;
}

export const useUsersStore = create<Props>((set, get) => ({
    usersList: [],
    fetchedUsersList: [],
    fetching: false,
    hasError: false,
    userStatistics: [],
    availableCountries: [],
    fetchUsersList: async (params) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getAllUsers(params);
            const { availableCountries, statistics } = UserMapping(response);
            set({
                usersList: response,
                fetchedUsersList: response,
                fetching: false,
                userStatistics: statistics,
                availableCountries,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    handleSearchUsers: (searchValue) => {
        const mainData = get().fetchedUsersList;
        if (!searchValue)
            return set({
                usersList: mainData,
            });
        const filteredUsers = [...mainData].filter((i) => {
            return (
                i?.name?.first.toLowerCase().includes(searchValue.toLowerCase()) ||
                i?.name?.last.toLowerCase().includes(searchValue.toLowerCase()) ||
                i?.email.toLowerCase().includes(searchValue.toLowerCase())
            );
        });
        set({
            usersList: filteredUsers.length < 1 ? [] : filteredUsers,
        });
    },
    handleFilteredCountries: (filteredValue) => {
        const mainData = get().fetchedUsersList;
        if (!filteredValue)
            return set({
                usersList: mainData,
            });
        const filteredUsers = [...mainData].filter((i) => {
            return (
                i.location.country === filteredValue
            );
        });
        set({
            usersList: filteredUsers.length < 1 ? [] : filteredUsers,
        });
    },
}));
