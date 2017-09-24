CREATE TABLE [dbo].[Organisation]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [Name] NVARCHAR(200) NULL, 
    [PrimaryContactName] NVARCHAR(200) NULL, 
    [PrimaryContactEmail] NVARCHAR(200) NULL
)
