CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Email] NVARCHAR(200) NOT NULL, 
    [FirstName] NVARCHAR(50) NULL, 
    [LastName] NVARCHAR(50) NULL, 
    [PasswordHash] VARBINARY(MAX) NULL, 
    [PasswordSalt] VARBINARY(MAX) NULL, 
    [Avatar] NVARCHAR(255) NULL, 
    [Created] DATETIME NULL, 
    [PreferredLang] NCHAR(10) NULL, 
    [Organisation] UNIQUEIDENTIFIER NULL, 
    [Provider] NVARCHAR(50) NULL, 
    CONSTRAINT [FK_User_Organisation] FOREIGN KEY ([Organisation]) REFERENCES [Organisation]([Id]) 
)

GO
