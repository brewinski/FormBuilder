GO
PRINT N'Seeding initial ControlDefinitions'

GO

INSERT INTO ControlDefinition 
VALUES 
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Layout Control', 'ControlRowComponent', '', 'Layout'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Input Control', 'ControlTextboxComponent', '', 'Textbox'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Input Control', 'ControlTextareaComponent', '', 'Textarea'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Input Control', 'ControlRadiolistComponent', '', 'Radio Button List'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Input Control', 'ControlMultiselectComponent', '', 'Multi-select'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Information Control', 'ControlHeadingComponent', '', 'Heading'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Input Control', 'ControlDropdownComponent', '', 'Dropdown List'),
	(newid(), GETDATE(), 'Bastogne', GETDATE(), 'Bastogne', 'Output Control', 'ControlButtonComponent', '', 'Button')

GO
PRINT N'Complete'
GO