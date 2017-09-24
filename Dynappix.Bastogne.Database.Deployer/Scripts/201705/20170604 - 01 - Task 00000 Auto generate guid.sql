GO
PRINT N'Dropping [dbo].[FK_Control_Control]...';


GO
ALTER TABLE [dbo].[Control] DROP CONSTRAINT [FK_Control_Control];


GO
PRINT N'Creating unnamed constraint on [dbo].[Control]...';


GO
ALTER TABLE [dbo].[Control] WITH NOCHECK
    ADD FOREIGN KEY ([ParentControlId]) REFERENCES [dbo].[Control] ([ControlId]);


GO
