import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(err => ({
        field: (err as any).path || (err as any).param,
        message: err.msg
      }))
    });
    return;
  }
  next();
};

export const validateEnquiry = [
  body("name").trim().notEmpty().withMessage("Full Name is required").isLength({ min: 2, max: 100 }),
  body("email").trim().isEmail().withMessage("A valid email address is required").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required").matches(/^[+0-9\s-]{8,20}$/).withMessage("Enter a valid phone number (8-20 digits)"),
  body("type").optional().isIn(["enrollment", "general", "corporate"]).withMessage("Invalid enquiry type"),
  handleValidationErrors
];

export const validateApplication = [
  body("name").trim().notEmpty().withMessage("Applicant Name is required").isLength({ min: 2, max: 100 }),
  body("email").trim().isEmail().withMessage("A valid email address is required").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("type").isIn(["trainer", "franchise"]).withMessage("Type must be either trainer or franchise"),
  handleValidationErrors
];

export const validateJobPosting = [
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("recruiterName").trim().notEmpty().withMessage("Recruiter contact name is required"),
  body("officialEmail").trim().isEmail().withMessage("Official company email is required").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("jobTitle").trim().notEmpty().withMessage("Job title is required"),
  body("skills").trim().notEmpty().withMessage("Key required skills are required"),
  handleValidationErrors
];

export const validateSupportTicket = [
  body("name").trim().notEmpty().withMessage("Student name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("description").trim().notEmpty().withMessage("Issue description is required").isLength({ min: 10 }).withMessage("Please provide at least 10 characters describing your issue"),
  handleValidationErrors
];

export const validateLogin = [
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors
];
