using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class RegisterUserIdOnRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegisterUserId",
                table: "Rooms",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegisterUserId",
                table: "Rooms");
        }
    }
}
