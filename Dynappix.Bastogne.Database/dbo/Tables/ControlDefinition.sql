CREATE TABLE [dbo].[ControlDefinition]
(
	[ControlTypeId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [CreatedDate] DATETIME NULL, 
    [CreatedId] NVARCHAR(500) NULL, 
    [UpdatedDate] DATETIME NULL, 
    [UpdatedId] NVARCHAR(500) NULL, 
    [Catagory] NVARCHAR(200) NULL, 
    [ComponentName] NVARCHAR(200) NULL, 
    [Description] NVARCHAR(MAX) NULL, 
    [ControlName] NVARCHAR(500) NULL
)
