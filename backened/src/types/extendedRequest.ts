import express  from 'express'

export interface ExtendRequest extends express.Request{
    user?:any

}