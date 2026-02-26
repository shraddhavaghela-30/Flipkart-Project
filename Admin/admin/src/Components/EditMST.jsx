import React from 'react'

export default function EditMST() {
  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Edit MST Order</h4>

              <div>
                <label className='profile-span'>Total Items</label>
                <input type="number" name="Total Items" id="Total Items" className='edit-inputs' placeholder='Enter Total Items'/>
              </div>
              <div>
                <label className='profile-span'>Discount</label>
                <input type="text" name="Discount" id="Discount" placeholder='Enter Discount' className='edit-inputs'/>
              </div>

              <div>
                <label className='profile-span'>Coupons</label>
                <input type="text" name="Coupons" id="Coupons" placeholder='Enter Coupons' className='edit-inputs'/>
              </div>

              <div>
                <label className='profile-span'>Delivery Charges</label>
                <input type="text" name="delivery-charges" id="delivery-charges" placeholder='Enter Delivery Charges' className='edit-inputs' />
              </div>

              <div>
                <label className='profile-span'>Total Amount</label>
                <input type="text" name="total-amount" id="total-amount" placeholder='Enter Total Amount' className='edit-inputs'/>
              </div>

              <div>
                <label className='profile-span'>Total Discount</label>
                <input type="text" name="total-discount" id="total-discount" placeholder='Enter Total Discount' className='edit-inputs'/>
              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn'>Add</button>
                <button type="button" className='add-admin-btn'>Reset</button>
              </div>
        </div>
    </div>
  )
}
