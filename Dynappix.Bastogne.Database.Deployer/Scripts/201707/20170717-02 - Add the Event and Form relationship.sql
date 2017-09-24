GO
PRINT N'Altering [dbo].[Event]...';


GO
ALTER TABLE [dbo].[Event]
    ADD [PartialId] UNIQUEIDENTIFIER NOT NULL;


GO
PRINT N'Creating [dbo].[FK_Event_PartialId]...';


GO
ALTER TABLE [dbo].[Event] WITH NOCHECK
    ADD CONSTRAINT [FK_Event_PartialId] FOREIGN KEY ([PartialId]) REFERENCES [dbo].[PartialForm] ([PartialId]);


GO
