using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class PhotoIsApprovedPropAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "admin-id",
                column: "ConcurrencyStamp",
                value: "2397514c-ce83-4f4e-a06f-6ad5880cf1c7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "member-id",
                column: "ConcurrencyStamp",
                value: "5bd056da-803d-4266-bfd9-d01819f87ef9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "moderator-id",
                column: "ConcurrencyStamp",
                value: "acef6b23-b9f7-46eb-9b02-19987c79fc9f");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Photos");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "admin-id",
                column: "ConcurrencyStamp",
                value: "c092b84e-3ca6-4917-a01a-9dd5dc6e56f7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "member-id",
                column: "ConcurrencyStamp",
                value: "2c33fd56-3870-4a0f-8290-12277b60efd2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "moderator-id",
                column: "ConcurrencyStamp",
                value: "b227671c-96b6-4b51-b7d8-132b9664096a");
        }
    }
}
