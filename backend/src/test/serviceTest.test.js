const serviceService = require("../services/serviceService");
const { addService, getServiceById, getServices, updateService, deleteService } = require("../controller/serviceController");
const mongoose = require("mongoose");

jest.mock("../services/serviceService");

const mockReq = (params = {}, body = {}) => ({ params, body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Service Controller Tests", () => {

  const mockService = {
    _id: "670ccfbd2c11c523c7489c56",
    serviceName: "X-rays",
    description: "we offer advanced X-ray services for accurate diagnosis and treatment of medical conditions. Our skilled radiologists provide high-quality images and timely reports, prioritizing patient comfort and safety throughout the process. Count on us for reliable imaging solutions tailored to your healthcare needs.",
    hospitalId: "dinithisanjana563@gmail.com",
    image: "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/pexels-cottonbro-7579829.jpg?alt=media&token=f6e048fc-34e1-4f87-99bc-3c5073ea6b84",
    price: 1500,
    __v: 0
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addService - should return 201 and the created service", async () => {
    const req = mockReq({}, {
        serviceName: "X-rays",
        description: "we offer advanced X-ray services for accurate diagnosis and treatment of medical conditions. Our skilled radiologists provide high-quality images and timely reports, prioritizing patient comfort and safety throughout the process. Count on us for reliable imaging solutions tailored to your healthcare needs.",
        hospitalId: "dinithisanjana563@gmail.com",
        image: "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/pexels-cottonbro-7579829.jpg?alt=media&token=f6e048fc-34e1-4f87-99bc-3c5073ea6b84",
        price: 1500,
    });
    const res = mockRes();

    serviceService.addService.mockResolvedValue(mockService);

    await addService(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockService);
  });

  test("getServiceById - should return 200 with the requested service", async () => {
    const req = mockReq({ id: "670ccfbd2c11c523c7489c56" });
    const res = mockRes();

    serviceService.getServiceById.mockResolvedValue(mockService);

    await getServiceById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockService);
  });

  test("getServices - should return 200 with a list of services", async () => {
    const req = mockReq({ hospitalId: "dinithisanjana563@gmail.com" });
    const res = mockRes();

    serviceService.getServicesByHospitalId.mockResolvedValue([mockService]);

    await getServices(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockService]);
  });

  test("updateService - should return 200 with the updated service", async () => {
    const req = mockReq({ id: "670ccfbd2c11c523c7489c56" }, { price: 2000 });
    const res = mockRes();

    const updatedService = { ...mockService, price: 2000 };
    serviceService.updateService.mockResolvedValue(updatedService);

    await updateService(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedService);
  });

  test("deleteService - should return 200 with success message", async () => {
    const req = mockReq({ id: "670ccfbd2c11c523c7489c56" });
    const res = mockRes();

    serviceService.deleteService.mockResolvedValue(true);

    await deleteService(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Service deleted" });
  });

  test("getServiceById - invalid ObjectId format should return 400", async () => {
    const req = mockReq({ id: "invalid_id" });
    const res = mockRes();

    await getServiceById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid service ID format" });
  });
});
