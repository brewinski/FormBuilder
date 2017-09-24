CREATE TABLE [dbo].[Rule]
(
	[RuleId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT newid(), 
    [RuleName] NVARCHAR(MAX) NULL, 
    [CreatedDate] NCHAR(10) NULL, 
    [CreatedId] NCHAR(10) NULL, 
    [UpdatedDate] NCHAR(10) NULL, 
    [UpdatedId] NCHAR(10) NULL, 
    [EventId] UNIQUEIDENTIFIER NULL, 
    [TriggerComponentId] NVARCHAR(200) NULL, 
    [TriggerFunctionId] NVARCHAR(200) NULL,
	[RuleSettings] NVARCHAR(MAX) NULL, 
    CONSTRAINT [FK_Rule_EventId] FOREIGN KEY ([EventId]) REFERENCES [Event]([EventId]), 
)
