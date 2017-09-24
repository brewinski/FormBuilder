CREATE TABLE [dbo].[Event]
(
	[EventId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [EventName] NVARCHAR(500) NULL, 
    [CreatedDate] DATETIME NULL, 
    [CreatedId] NVARCHAR(200) NULL, 
    [UpdatedDate] DATETIME NULL, 
    [UpdatedId] NVARCHAR(200) NULL,
	[PartialId] UNIQUEIDENTIFIER NOT NULL,
	[ControlId] UNIQUEIDENTIFIER NULL, 
    CONSTRAINT [FK_Event_PartialId] FOREIGN KEY ([PartialId]) REFERENCES [PartialForm]([PartialId]), 
	--CONSTRAINT [FK_Event_ControlId] FOREIGN KEY ([ControlId]) REFERENCES [Control]([ControlId]), 
)
