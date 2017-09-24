CREATE TABLE [dbo].[UserRole]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [RoleId] UNIQUEIDENTIFIER NULL, 
    [UserId] INT NULL, 
    CONSTRAINT [FK_RoleId_Role] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id]), 
    CONSTRAINT [FK_UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
)
