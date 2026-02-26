import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div class="footer">
            <div class="footer-in-1">
                <div class="footer-in-11">
                    <div>
                        <span class="list-span">ABOUT</span>
                        <ul class="footer-lists">
                            <Link to='/contact-us' className='contact-us'>Contact Us</Link><br />
                            <Link to='/about-us' className='contact-us'>About Us</Link>
                            <li>Careers</li>
                            <li>Flipkart Stories</li>
                            <li>Press</li>
                            <li>Corporate Information</li>
                        </ul>
                    </div>
                    <div>
                        <span class="list-span">GROUP COMPANIES</span>
                        <ul class="footer-lists">
                            <li>Myntra</li>
                            <li>Cleartrip</li>
                            <li>Shopsy</li>
                        </ul>
                    </div>
                    <div>
                        <span class="list-span">HELP</span>
                        <ul class="footer-lists">
                            <li>Payments</li>
                            <li>Shipping</li>
                            <li>Cancellation &</li>
                            <li>Returns</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <span class="list-span">CONSUMER POLICY</span>
                        <ul class="footer-lists">
                            <li>Cancellation &</li>
                            <li>Returns</li>
                            <li>Terms Of Use</li>
                            <li>Security</li>
                            <li>Privacy</li>
                            <li>Sitemap</li>
                            <li>Grievance Redressal</li>
                            <li>EPR Compliance</li>
                            <li>FSSAI Food Safety</li>
                            <li>Connect App</li>
                        </ul>
                    </div>
                    <div class="mailus-div">
                        <div>
                            <span class="list-span">Mail Us</span>
                            <div class="mail-us">
                                <span>Flipkart Internet Private Limited,</span>
                                <span>Buildings Alyssa, Begonia & </span>
                                <span>Clove Embassy Tech Village,</span>
                                <span>Outer Ring Road, Devarabeesanahalli Village,</span>
                                <span>Bengaluru, 560103,</span>
                                <span>Karnataka, India</span>
                            </div>
                        </div>
                        <div class="social">
                            <span class="list-span">Social:</span>
                            <div class="footer-img">
                                <img src="/img/f-link-1.svg" alt="f-link-1"/>
                                <img src="/img/f-link-2.svg" alt="f-link-2"/>
                                <img src="/img/f-link-3.svg" alt="f-link-3"/>
                                <img src="/img/f-link-4.svg" alt="f-link-4" class="insta-img"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="list-span">Registered Office Address</span>
                        <div class="mail-us">
                            <span>Flipkart Internet Private Limited,</span>
                            <span>Buildings Alyssa, Begonia & </span>
                            <span>Clove Embassy Tech Village,</span>
                            <span>Outer Ring Road, Devarabeesanahalli Village,</span>
                            <span>Bengaluru, 560103,</span>
                            <span>Karnataka, India</span>
                            <span className='cin-span'>CIN : U51109KA2012PTC066107</span>
                            <span>Telephone: <a href="#">044-45614799</a> / <a href="#">044-67415800</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-in-2">
                <div>
                    <img src="/img/f-link-5.svg" alt="f-link-5"/>
                    <span>Become a Seller</span>
                </div>
                <div>
                    <img src="/img/f-link-6.svg" alt="f-link-6"/>
                    <span>Advertise</span>
                </div>
                <div>
                    <img src="/img/f-link-7.svg" alt="f-link-7"/>
                    <span>Gift Cards</span>
                </div>
                <div>
                    <img src="/img/f-link-8.svg" alt="f-link-8"/>
                    <span>Help Center</span>
                </div>
                <div>
                    <span>&copy; 2007-2026 Flipkart.com</span>
                </div>
                <div>
                    <img src="/img/f-link-9.svg" alt="f-link-9" class="pay-link"/>
                </div>
            </div>
        </div>
  )
}
