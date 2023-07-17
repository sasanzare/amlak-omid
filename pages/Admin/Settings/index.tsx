import { useState, useEffect, useContext } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../../context";
import { Form, Card, Button } from "react-bootstrap";
import { getSettingsApi } from "../../../api";

export default () => {
    const { setShowLoading } = useContext(context);
    const [settings, setSettings] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        getSettings();
    }, []);

    function getSettings() {
        setShowLoading(true);
        axios
            .get(getSettingsApi)
            .then((res) => {
                setSettings(res.data);
                if (res.status === 200) {
                    setShowLoading(false);
                }
            })
            .catch((err) => {
                if (err.response?.data) {
                    err?.response?.data?.errors?.map((issue) => toast.error(issue));
                } else {
                    toast.error("مشکلی پیش آمده است!");
                }
                setShowLoading(false);
            });
    }

    function updateSettings(event) {
        event.preventDefault();
        setIsUpdating(true);

        axios
            .put(getSettingsApi, settings)
            .then((res) => {
                setIsUpdating(false);
                toast.success("تنظیمات با موفقیت به روز رسانی شد!");
                getSettings();
            })
            .catch((err) => {
                setIsUpdating(false);
                if (err.response?.data) {
                    err?.response?.data?.errors?.map((issue) => toast.error(issue));
                } else {
                    toast.error("مشکلی پیش آمده است!");
                }
            });
    }

    function handleInputChangeInt(event) {
        const { name, value } = event.target;
        if (parseInt(value) < 0) {

        }
        setSettings((prevSettings) => ({ ...prevSettings, [name]: parseInt(value) }));
    }

    return (
        <AdminLayout>
            <div className="p-2 pt-5">
                <h2>تنظیمات</h2>
            </div>

            <Card className="mb-4">
                <Card.Header>تنظیمات</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateSettings}>
                        <Form.Group className="mb-3">
                            <Form.Label>حداکثر آگهی روزانه برای مشتری</Form.Label>
                            <Form.Control
                                type="number"
                                name="maximumDailyRealEstatesForClient"
                                value={settings.maximumDailyRealEstatesForClient || 0}
                                onChange={handleInputChangeInt}
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>حداکثر آگهی روزانه برای مشاورها</Form.Label>
                            <Form.Control
                                type="number"
                                name="maximumDailyRealEstatesForAgency"
                                value={settings.maximumDailyRealEstatesForAgency || 0}
                                onChange={handleInputChangeInt}
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                حداکثر آگهی روزانه برای املاک ها
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="maximumDailyRealEstatesForAgentOfAgencies"
                                value={settings.maximumDailyRealEstatesForAgentOfAgencies || 0}
                                onChange={handleInputChangeInt}
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                حداکثر تعداد اتاق قابل جستجو
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="maximumNumberOfRooms"
                                value={settings.maximumNumberOfRooms || 0}
                                onChange={handleInputChangeInt}
                                min={0}
                            />
                        </Form.Group>


                        {/* Add more form inputs for other settings fields */}

                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "در حال بروز رسانی..." : "به روز رسانی تنظیمات"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <ToastContainer position="top-left" rtl={true} theme="colored" />
        </AdminLayout>
    );
};
