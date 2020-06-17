using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class UpdateExamination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SecretaryCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SpecialityCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SecretaryCount",
                table: "Examinations");

            migrationBuilder.DropColumn(
                name: "SpecialityCount",
                table: "Examinations");
        }
    }
}
