import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Suggestions from './Suggestions';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { BingMapApiKey } from '../config/Creds';

const DashboardForm = () => {

    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [result, setResult] = useState(null);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, [])


    const showPosition = (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }


    return (
        <>
            <Formik
                initialValues={{ queryString: '', radius: '', entityType: [], language: '', region: '', country: '' }}
                validationSchema={Yup.object({
                    radius: Yup.number()
                        .max(50000, 'Must be 50000 Meter or less')
                        .min(100, 'Minimum value should be 100 Meter.')
                        .required('Required'),
                    entityType: Yup.array().min(1, 'Select atleast one option of Category').of(Yup.string().required()).required(),
                    language: Yup.string()
                        .required('Required'),
                    region: Yup.string()
                        .required('Required'),
                    country: Yup.string()
                        .required('Required'),
                    queryString: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const URL = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${values.queryString}&userLocation=${Latitude},${Longitude},${values.radius}&maxResults=10&includeEntityTypes=${values.entityType.toString()}&culture=${values.language}&userRegion=${values.region}&countryFilter=${values.country}&key=${BingMapApiKey}`;
                    console.log('URL', URL);

                    const fetchData = await fetch(URL);
                    const result = await fetchData.json();
                    if (result?.resourceSets[0]?.resources[0]?.value.length === 0) {
                        toast.error('No Result Found For '+values.queryString+', Search another Address/Place/Buisness.');
                    }
                    setResult(result);
                }}
            >
                <div className='max-w-screen-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
                    <Form>
                        <div className='text-lg font-bold text-white bg-black text-center'>
                            Bing Maps Autosuggest API
                        </div>
                        <div className="grid grid-cols-2 gap-1 p-2">

                            <div>
                                <label>Current Location</label>
                            </div>
                            <div>
                                <span>{Latitude}, {Longitude}</span>
                            </div>


                            <div>
                                <label htmlFor="queryString">Place/Category</label>
                            </div>
                            <div>
                                <Field name="queryString" type="text" className='border border-black' />
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="queryString" />
                            </div>


                            <div>
                                <label htmlFor="radius">Radius</label>
                            </div>
                            <div>
                                <Field name="radius" type="text" className='border border-black' />
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="radius" />
                            </div>


                            <div>
                                <label htmlFor="entityType">Include Category</label>
                            </div>
                            <div>
                                {/* <Field name="entityType" type="entityType" className='border border-black' /> */}
                                <label>
                                    <Field type="checkbox" name="entityType" value="Address" />
                                    Address
                                </label>
                                <label>
                                    <Field type="checkbox" name="entityType" value="Place" />
                                    Place
                                </label>
                                <label>
                                    <Field type="checkbox" name="entityType" value="Business" />
                                    Business
                                </label>
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="entityType" />
                            </div>


                            <div>
                                <label htmlFor="language">Language</label>
                            </div>
                            <div>
                                {/* <Field name="language" type="language" className='border border-black' /> */}
                                <Field name="language" as="select" className="my-select border border-black w-44">
                                    <option value="">Select</option>
                                    <option value="HI">Hindi (India)</option>
                                    <option value="EN-GB">English (United Kingdom)	</option>
                                    <option value="EN-US">English (United States)</option>
                                    <option value="ZH-CN">Chinese (PRC)	</option>
                                    <option value="EN-CA">English (Canada)</option>
                                    <option value="EN-IE">English (Ireland)</option>
                                    <option value="EN-JM">English (Jamaica)	</option>
                                    <option value="EN-ZA">English (South Africa)</option>
                                </Field>
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="language" />
                            </div>


                            <div>
                                <label htmlFor="region">Region</label>
                            </div>
                            <div>
                                {/* <Field name="region" type="region" className='border border-black' /> */}
                                <Field name="region" as="select" className="my-select border border-black w-44">
                                    <option value="">Select</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="GB-ENG">England</option>
                                    <option value="GB-NIR">Northern Ireland</option>
                                    <option value="GB-SCT">Scotland</option>
                                    <option value="GB-WLS">Wales</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IN">India</option>
                                    <option value="DE">DE</option>
                                    <option value="US">USA</option>
                                </Field>
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="region" />
                            </div>


                            <div>
                                <label htmlFor="country">Country</label>
                            </div>
                            <div>
                                <Field name="country" as="select" className="my-select border border-black w-44">
                                    <option value="">Select</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="GB-ENG">England</option>
                                    <option value="GB-NIR">Northern Ireland</option>
                                    <option value="GB-SCT">Scotland</option>
                                    <option value="GB-WLS">Wales</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IN">India</option>
                                    <option value="DE">DE</option>
                                    <option value="US">USA</option>
                                </Field>
                            </div>
                            <div className='col-span-2 text-center text-red-600 font-bold text-sm'>
                                <ErrorMessage name="country" />
                            </div>


                            <div className='col-span-2 text-center mt-4 p-2'>
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                            </div>
                        </div>
                    </Form>
                </div>

            </Formik>
            {result && <Suggestions result={result} />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default DashboardForm