// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8001/cart/' }),
    endpoints: (builder) => ({
        listAllUsers: builder.query({
            query: () => ({
                url: 'user/',
                method: 'GET'
            }),
        }),
        getOneUser: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `user/${userId}/`,
                method: 'GET'
                }
            },
        }),
        
        createUser: builder.mutation({
            query: (user) => ({
                url: 'user/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => {
                const {id, ...data} = user
                return {
                url: `user/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),
        deleteUser: builder.mutation({
            query: (categoryId) => {
                console.log("id",categoryId)
                return {
                url: `user/${categoryId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),
        createCart: builder.mutation({
            query: (cart) => ({
                url: 'cart/',
                method: 'POST',
                body: cart,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCart: builder.mutation({
            query: (cart) => {
                const {id, ...data} = cart
                return {
                url: `cart/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        deleteCart: builder.mutation({
            query: (cartId) => {
                console.log("id",cartId)
                return {
                url: `cart/${cartId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            }
        }), 
        getCartCheckout: builder.query({
            query: (cartId) => {
                console.log("id",cartId)
                return {
                url: `cart/checkout/${cartId}/`,
                method: 'GET'
                }
            }
        }),

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useListAllUsersQuery , useGetOneUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation , useCreateCartMutation, useUpdateCartMutation, useDeleteCartMutation,useGetCartCheckoutQuery} = cartApi