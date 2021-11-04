import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
	<div className="container" style={{marginTop: 150}}>
		<div className="row justify-content-center">
			<div className="col-7 col-md-3" style={{ marginTop: "10%" }}>
				<ReactLoading type={type} color={color} height={200} width={200} />
			</div>
			<div className="col-12" style={{ marginBottom: "10%" }}>
				<h4 style={{ textAlign: "center", color: color, marginTop: 20}}>
					Hold It !! Loading ....{" "}
				</h4>
			</div>
		</div>
	</div>
);

export default Loading;
