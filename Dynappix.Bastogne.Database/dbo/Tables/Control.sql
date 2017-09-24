CREATE TABLE [dbo].[Control]
(
	[ControlId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [CreatedDate] DATETIME NULL, 
    [CreatedId] NVARCHAR(200) NULL, 
    [UpdatedDate] DATETIME NULL, 
    [UpdatedId] NVARCHAR(200) NULL, 
    [Name] NCHAR(200) NULL, 
    [Settings] NVARCHAR(MAX) NULL, 
    [ControlTypeId] NCHAR(50) NULL, 
    [PartialId] UNIQUEIDENTIFIER NULL, 
    [ParentControlId] UNIQUEIDENTIFIER NULL FOREIGN KEY REFERENCES [Control](ControlId), 
    [Order] INT NULL, 
    CONSTRAINT [FK_Control_PartialId] FOREIGN KEY ([PartialId]) REFERENCES [PartialForm]([PartialId]), 
)
