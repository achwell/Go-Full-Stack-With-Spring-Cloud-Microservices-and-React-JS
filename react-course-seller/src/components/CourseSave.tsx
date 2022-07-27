import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Modal } from 'react-bootstrap'
import {useForm} from "react-hook-form"
import Course from '../models/course'
import CourseService from '../services/course.service'
import ICourse from "../models/interfaces/ICource"

interface Props {
    course: ICourse
    onSaved: (couse: ICourse) => void
}

const CourseSave = forwardRef((props: Props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showCourseModal() {
            setTimeout(() => {
                setShow(true)
            }, 0)
        }
    }))

    //send it from parent
    useEffect(() => {
        reset(props.course);
    }, [props.course])

    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)

    const {register, handleSubmit, formState: {errors, isSubmitted}, reset} = useForm<ICourse>({
        defaultValues: new Course('', '', 0, new Date(), 0)
    })


    const saveCourse = (data: ICourse) => {
        CourseService.saveCourse(data).then(response => {
            props.onSaved(response.data)
            setShow(false)
        }).catch((err) => {
            setErrorMessage('Unexpected error occurred.')
            console.log(err)
        })
    };

    return (
        <Modal show={show}>
            <form onSubmit={handleSubmit(saveCourse)}
                  noValidate
                  className={isSubmitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title">Course Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            required
                            {...register("title", {required: "Title is required.", maxLength: 100})}
                        />
                        {errors.title && errors.title.message && <div className="invalid-feedback">
                            {errors.title.message}
                        </div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitle: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Subtitle"
                            required
                            {...register("subtitle", {required: "Subtitle is required.", maxLength: 100})}
                        />
                        {errors.subtitle && errors.subtitle.message && <div className="invalid-feedback">
                            {errors.subtitle.message}
                        </div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            className="form-control"
                            placeholder="Price"
                            required
                            {...register("price", {required: "Price is required and should be greater than 0.", min: 0})}
                        />
                        {errors.price && errors.price.message && <div className="invalid-feedback">
                            {errors.price.message}
                        </div>}
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>

            </form>
        </Modal>
    )
})

export {CourseSave}