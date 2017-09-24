CREATE TABLE [dbo].[PartialForm]
(
	[PartialId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [RowId] UNIQUEIDENTIFIER NULL, 
    [CreatedDate] DATETIME NULL, 
    [CreatedId] NVARCHAR(50) NULL, 
    [UpdatedDate] DATETIME NULL, 
    [UpdatedId] NVARCHAR(50) NULL, 
    [Name] NVARCHAR(200) NULL, 
    [Settings] NVARCHAR(MAX) NULL, 
    [Version] NCHAR(10) NULL
)
