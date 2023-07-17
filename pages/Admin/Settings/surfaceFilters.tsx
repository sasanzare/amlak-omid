import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSurfaceFiltersApi, createSurfaceFilterApi, updateSurfaceFilterApi, deleteSurfaceFilterApi } from '../../../api';
import { AdminLayout } from '../../../layout';
import { convertToEnglishDigits, convertToPersianDigits } from '../../../lib/number-converter';
import { addCommas, digitsFaToEn, removeCommas } from '@persian-tools/persian-tools';

export default function SurfaceFilters() {
    const [surfaceFilters, setSurfaceFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [newFilter, setNewFilter] = useState({
        minValue: convertToPersianDigits(0),
        maxValue: convertToPersianDigits(0),
    });

    useEffect(() => {
        fetchSurfaceFilters();
    }, []);

    const fetchSurfaceFilters = () => {
        setLoading(true);
        axios
            .get(getSurfaceFiltersApi)
            .then((res) => {
                setSurfaceFilters(res.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('مشکلی پیش آمده است!');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteSurfaceFilter = (filterId) => {
        axios
            .delete(deleteSurfaceFilterApi, { data: { id: filterId } })
            .then(() => {
                toast.success('فیلتر با موفقیت حذف شد!');
                fetchSurfaceFilters();
            })
            .catch((error) => {
                console.error(error);
                toast.error('مشکلی پیش آمده است!');
            });
    };

    const createSurfaceFilter = () => {
        const { minValue, maxValue } = newFilter;
        axios
            .post(createSurfaceFilterApi, {
                minValue: parseInt(convertToEnglishDigits(minValue)),
                maxValue: parseInt(convertToEnglishDigits(maxValue)),
            })
            .then((res) => {
                toast.success('تنظیمات با موفقیت به روز رسانی شد!');
                setModalShow(false);
                setNewFilter({ minValue: '', maxValue: '' });
                fetchSurfaceFilters();
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('مشکلی پیش آمده است!');
                }
            });
    };

    const updateSurfaceFilter = (id, minValue, maxValue) => {
        axios
            .put(updateSurfaceFilterApi, {
                id,
                minValue,
                maxValue,
            })
            .then((res) => {
                toast.success('تنظیمات با موفقیت به روز رسانی شد!');
                fetchSurfaceFilters();
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('مشکلی پیش آمده است!');
                }
            });
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        console.log(index);
        if (index !== undefined) {
            setSurfaceFilters((prevFilters) => {
                const updatedFilters = [...prevFilters];
                const updatedFilter = {
                    ...updatedFilters[index],
                    [name]: removeCommas(digitsFaToEn(String(value))),
                };
                if (name === 'maxValue') {
                    const minValue = updatedFilter.minValue;
                    const maxValue = updatedFilter.maxValue;
                    if (maxValue !== '' && minValue !== '' && parseInt(maxValue) < parseInt(minValue)) {
                        // If the maximum value is lower than the minimum value, set it to the minimum value
                        updatedFilter.maxValue = updatedFilter.minValue;
                        toast.error('حداکثر باید بیشتر از حداقل باشد!');
                    }
                } else if (name === 'minValue') {
                    const minValue = updatedFilter.minValue;
                    const maxValue = updatedFilter.maxValue;
                    if (maxValue !== '' && minValue !== '' && parseInt(minValue) > parseInt(maxValue)) {
                        // If the minimum value is greater than the maximum value, set it to the maximum value
                        updatedFilter.minValue = updatedFilter.maxValue;
                        toast.error('حداقل باید کمتر از حداکثر باشد!');
                    }
                }
                updatedFilters[index] = updatedFilter;
                return updatedFilters;
            });
        } else {
            setNewFilter((prevFilter) => {
                const updatedFilter = {
                    ...prevFilter,
                    [name]: removeCommas(digitsFaToEn(String(value))),
                };
                if (name === 'maxValue') {
                    const minValue = updatedFilter.minValue;
                    const maxValue = updatedFilter.maxValue;
                    if (maxValue !== '' && minValue !== '' && parseInt(maxValue) < parseInt(minValue)) {
                        // If the maximum value is lower than the minimum value, set it to the minimum value
                        updatedFilter.maxValue = updatedFilter.minValue;
                        toast.error('حداکثر باید بیشتر از حداقل باشد!');
                    }
                } else if (name === 'minValue') {
                    const minValue = updatedFilter.minValue;
                    const maxValue = updatedFilter.maxValue;
                    if (maxValue !== '' && minValue !== '' && parseInt(minValue) > parseInt(maxValue)) {
                        // If the minimum value is greater than the maximum value, set it to the maximum value
                        updatedFilter.minValue = updatedFilter.maxValue;
                        toast.error('حداقل باید کمتر از حداکثر باشد!');
                    }
                }
                return updatedFilter;
            });
        }
    };

    return (
        <AdminLayout>
            <div className="p-2">
                <Card>
                    <Card.Body>
                        <h5>فیلترهای مساحت موجود</h5>
                        {surfaceFilters.map((filter, index) => (
                            <div
                                key={filter.id}
                                className="d-flex align-items-center mb-3 rounded p-2"
                                style={{ border: '1px solid #28a745' }}
                            >
                                <div className="me-2 bg-success text-center rounded p-2">{index + 1}</div>
                                <Form.Group controlId={`minValue_${filter.id}`} className="flex-grow-1">
                                    <Form.Control
                                        type="string"
                                        name="minValue"
                                        value={convertToPersianDigits(addCommas(filter.minValue))}
                                        onChange={(e) => handleInputChange(e, index)}
                                        min={0}
                                    />
                                </Form.Group>
                                <div className="mx-2 text-white">تا</div>
                                <Form.Group controlId={`maxValue_${filter.id}`} className="flex-grow-1">
                                    <Form.Control
                                        type="string"
                                        name="maxValue"
                                        value={convertToPersianDigits(addCommas(filter.maxValue))}
                                        onChange={(e) => handleInputChange(e, index)}
                                        min={0}
                                    />
                                </Form.Group>
                                <Button
                                    variant="light"
                                    className="text-primary"
                                    onClick={() => updateSurfaceFilter(filter.id, filter.minValue, filter.maxValue)}
                                >
                                    ذخیره
                                </Button>
                                <Button variant="danger" className="ms-2" onClick={() => deleteSurfaceFilter(filter.id)}>
                                    حذف
                                </Button>
                            </div>
                        ))}
                        <Button variant="success" className="my-3" onClick={() => setModalShow(true)}>
                            ایجاد فیلتر جدید
                        </Button>
                    </Card.Body>
                </Card>
                <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>ایجاد فیلتر جدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="minValue">
                                <Form.Label>حداقل مساحت</Form.Label>
                                <Form.Control
                                    type="string"
                                    name="minValue"
                                    value={convertToPersianDigits(addCommas(newFilter.minValue))}
                                    onChange={(e) => handleInputChange(e)}
                                    min={0}
                                />
                            </Form.Group>
                            <Form.Group controlId="maxValue">
                                <Form.Label>حداکثر مساحت</Form.Label>
                                <Form.Control
                                    type="string"
                                    name="maxValue"
                                    value={convertToPersianDigits(addCommas(newFilter.maxValue))}
                                    onChange={(e) => handleInputChange(e)}
                                    min={0}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>
                            لغو
                        </Button>
                        <Button variant="primary" onClick={createSurfaceFilter}>
                            ایجاد
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer position="top-left" rtl={true} theme="colored" />
            </div>
        </AdminLayout>
    );
}
