import React, { Component } from 'react'

class RegisterPeace extends Component {
  render() {
    return (
      <div>
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-6 text-center">ลงทะเบียนเข้าร่วมงานประชุมใหญ่</h1>
              <br/>
              {/* <p className="lead text-center">Let's get some information to make your profile stand out</p> */}
              {/* <small className="d-block pb-3">* = required field</small> */}
              <form action="add-experience.html">
                <div className="form-group">
                <label htmlFor="pea_id">ค้นหารหัสพนักงาน</label>
                  <input type="text" className="form-control form-control-lg" placeholder="* รหัสพักงาน" name="peaId" required />
                  {/* <small className="form-text text-muted">A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)</small> */}
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="fullName">ชื่อ - นามสกุล</label>
                      <input type="text" className="form-control form-control-lg" placeholder="* ชื่อ - นามสกุล" name="fullName" required />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="fullName">ตำแหน่ง</label>
                      <input type="text" className="form-control form-control-lg" placeholder="* ตำแหน่ง" name="position" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="fullName">สังกัด</label>
                      <input type="text" className="form-control form-control-lg" placeholder="* สังกัด" name="team" required />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="fullName">เบอร์มือถือ</label>
                      <input type="text" className="form-control form-control-lg" placeholder="* เบอร์มือถือ" name="mobile" required />
                    </div>
                </div>
                <div className="form-group">
                <div  className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="isSportman" name="isSportman" />
                       <label className="form-check-label" for="defaultCheck1">
                            นักกีฬา
                      </label>
                </div>
                <div className="form-check ">
                    <input className="form-check-input" type="checkbox" value="" id="isRetire" name="isRetire" />
                       <label className="form-check-label" for="defaultCheck1">
                            ผู้เกษียณ
                      </label>
                </div>
                </div>
                <div className="form-row">
                <div className="col-md-6">
                  <img src="https://img2.newchic.com/thumb/view/oaupload/newchic/images/92/0A/b9443dbc-d31f-4701-ad19-471af7c172e9.jpeg" class="rounded mx-auto d-block" alt="..." />
                  <br/>
                  <select className="form-control form-control-lg" name="shirt1">
                    <option value="0" selected disabled>* เลือกไซต์เสื้อ</option>
                    <option value="s">Size: S</option>
                    <option value="m">Size: M</option>
                    <option value="l">Size: L</option>
                  </select>
                  <small className="form-text text-muted">*รอบอก S:32 M:34 L:42</small>
                </div>
                <div className="col-md-6">
                  <img src="https://cdn.shopify.com/s/files/1/2158/0915/products/product-image-520097089.jpg?v=1513874750" class="rounded mx-auto d-block" alt="..." />
                  <br/>
                  <select className="form-control form-control-lg" name="shirt1">
                    <option value="0" selected disabled>* เลือกไซต์เสื้อ</option>
                    <option value="s">Size: S</option>
                    <option value="m">Size: M</option>
                    <option value="l">Size: L</option>
                  </select>
                  <small className="form-text text-muted">*รอบอก S:32 M:34 L:42</small>
                  </div>
                </div>
                <br/>
                <div className="form-group">
                 <label>กิจกรรมดูงาน</label>
                  <select className="form-control form-control-lg" name="activity">
                    <option value="0" selected disabled>* กิจกรรมดูงาน</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                 <label>การจับคู่นอน</label>
                  <select className="form-control form-control-lg" name="roomate">
                    <option value="0" selected disabled>* รายชื่อคู่นอน</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <input type="submit" className="btn btn-info btn-block mt-4 btn-lg" />
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default RegisterPeace;