import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Container,
	Box,
	TextField,
	Button,
	Paper,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Alert,
	Tabs,
	Tab,
} from "@mui/material";
import { adapterRegistry } from "steel-compendium-sdk";
import JSONValidator from "./components/JSONValidator";

function TabPanel({ children, value, index, sx, ...other }) {
	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			sx={{
				flexGrow: 1,
				display: value === index ? "flex" : "none",
				flexDirection: "column",
				...sx,
			}}
		>
			{value === index && (
				<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
					{children}
				</Box>
			)}
		</Box>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	value: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	sx: PropTypes.object,
};

function App() {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [sourceFormat, setSourceFormat] = useState("Draw Steel Creature Statblock");
	const [targetFormat, setTargetFormat] = useState("YAML");
	const [error, setError] = useState("");
	const [availableFormats, setAvailableFormats] = useState([]);
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		setAvailableFormats(adapterRegistry.getAvailableFormats());
	}, []);

	const handleConvert = async () => {
		try {
			setError("");
			const result = await adapterRegistry.convert(inputText, sourceFormat, targetFormat);
			setOutputText(result);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleValidData = (validatedData) => {
		// When JSON is validated successfully, we could optionally do something with it
		// eslint-disable-next-line no-console
		console.log("Valid JSON data:", validatedData);
	};

	return (
		<Container
			maxWidth={false}
			disableGutters
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}
		>

			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={tabValue} onChange={handleTabChange} aria-label="converter tabs">
					<Tab label="Draw Steel Statblock Converter" />
					<Tab label="Statblock Validator" />
				</Tabs>
			</Box>

			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
				<TabPanel value={tabValue} index={0} sx={{ height: "100%" }}>
					{error && (
						<Alert severity="error" square>
							{error}
						</Alert>
					)}

					<Box sx={{ p: 2 }}>
						<Grid container spacing={2} alignItems="center">
							<Grid item xs={12} md>
								<FormControl fullWidth>
									<InputLabel>Input Format</InputLabel>
									<Select
										value={sourceFormat}
										label="Source Format"
										onChange={(e) => setSourceFormat(e.target.value)}
									>
										{availableFormats.map((format) => (
											<MenuItem key={format} value={format}>
												{format}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md="auto">
								<Box sx={{ textAlign: "center", width: "100%" }}>
									<Button
										variant="contained"
										size="large"
										onClick={handleConvert}
										disabled={!inputText || !sourceFormat || !targetFormat}
									>
										Convert
									</Button>
								</Box>
							</Grid>
							<Grid item xs={12} md>
								<FormControl fullWidth>
									<InputLabel>Output Format</InputLabel>
									<Select
										value={targetFormat}
										label="Target Format"
										onChange={(e) => setTargetFormat(e.target.value)}
									>
										{adapterRegistry.getAvailableFormats(true).map((format) => (
											<MenuItem key={format} value={format}>
												{format}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Box>

					<Grid container sx={{ flexGrow: 1 }}>
						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", flexDirection: "column" }}
						>
							<Paper
								square
								sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 1 }}
							>
								<Box sx={{
									flexGrow: 1,
									position: "relative",
								}}>
									<TextField
										sx={{
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
											"& .MuiInputBase-root": {
												height: "100%",
												alignItems: "flex-start",
											},
											"& textarea": {
												height: "100% !important",
												overflowY: "auto !important",
												boxSizing: "border-box",
											},
										}}
										multiline
										value={inputText}
										onChange={(e) => setInputText(e.target.value)}
										placeholder="Paste your statblock here..."
									/>
								</Box>
							</Paper>
						</Grid>

						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", flexDirection: "column" }}
						>
							<Paper
								square
								sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 1 }}
							>
								<Box sx={{
									flexGrow: 1,
									position: "relative",
								}}>
									<TextField
										sx={{
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
											"& .MuiInputBase-root": {
												height: "100%",
												alignItems: "flex-start",
											},
											"& textarea": {
												height: "100% !important",
												overflowY: "auto !important",
												boxSizing: "border-box",
											},
										}}
										multiline
										value={outputText}
										InputProps={{
											readOnly: true,
										}}
										placeholder="Converted statblock will appear here..."
									/>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</TabPanel>

				<TabPanel value={tabValue} index={1}>
					<JSONValidator onValidData={handleValidData} />
				</TabPanel>
			</Box>
		</Container>
	);
}

export default App;