import React from 'react'

export default function CartSpinner() {
    return (
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}