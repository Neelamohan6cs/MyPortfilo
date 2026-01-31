export default function Education() {
    return (
        <div className="education" id="education">
            <div className="content-inner">
                <div className="content-header">
                    <h2>Education</h2>
                </div>

                <div className="row align-items-center">

                    {/* B.E / B.Tech */}
                    <div className="col-md-6">
                        <div className="edu-col">
                            <span>2022 <i>to</i> Present</span>
                            <h3>B.E – Computer Science and Engineering</h3>
                            <p>
                                Dhanalakshmi Srinivasan Engineering College, Perambalur<br />
                                CGPA: <strong>7.76</strong> (Till 3rd Year)
                            </p>
                        </div>
                    </div>

                    {/* 12th Standard */}
                    <div className="col-md-6">
                        <div className="edu-col">
                            <span>2021 <i>to</i> 2022</span>
                            <h3>Higher Secondary Education (12th)</h3>
                            <p>
                                Thanthai Hans Roever Higher Secondary School, Perambalur<br />
                                Percentage: <strong>78%</strong>
                            </p>
                        </div>
                    </div>

                    {/* 10th Standard */}
                    <div className="col-md-6">
                        <div className="edu-col">
                            <span>2019 <i>to</i> 2020</span>
                            <h3>Secondary School Education (10th)</h3>
                            <p>
                                Thanthai Hans Roever Higher Secondary School, Perambalur<br />
                                Percentage: <strong>80%</strong>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
